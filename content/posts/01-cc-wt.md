+++
title = '[Coding Chalenge] - Building my Own wc Tool in Rust'
date = 2024-06-18T18:08:37-03:00
draft = false
+++

### Introduction
In this post, I'll walk you through my journey of building a custom version of the Unix `wc` (word count) tool, which I named `ccwc` (Coding Challenges Word Count). This project was inspired by a [coding challenge](https://codingchallenges.fyi/challenges/challenge-wc) designed to teach the Unix Philosophy of creating simple, composable command-line tools. You can find more details and source code in my [GitHub repository](https://github.com/Krymancer/ccwc).

### The Challenge
The challenge was to build a `wc` tool that can:
- Count the number of bytes, characters, lines, and words in a file.
- Handle command-line options to specify what to count.
- Read from standard input if no file is specified.

[The Unix Philosophy](http://www.catb.org/~esr/writings/taoup/html/) encourages writing simple programs that do one thing well and can be combined to perform complex tasks. Following this principle, I broke down the challenge into several steps, each adding a new feature to the tool.

### Step-by-Step Development

#### Step Zero: Data Structure
One of my favorite things in Rust has to be the type system, thats why I created a struct to represent the stats we might have to get from the input

```rust
struct Stats {
    pub bytes: usize,
    pub chars: usize,
    pub lines: usize,
    pub max_line_lenght: usize,
    pub words: usize,
    pub path: String,
}
```

#### Step One: Counting Bytes
The first task was to implement the `-c` option to count the number of bytes in a file. I did this using a 'constructor'

```rust
impl Stats {
    pub fn new(chars: Vec<u8>, path: String) -> Self {
        let mut stats = Stats {
            bytes: chars.len(),
            chars: 0,
            lines: 0,
            max_line_length: 0,
            words: 0,
            path,
        };
        // Additional processing...
        stats
    }
}
```

This function initializes a `Stats` struct with the number of bytes based on the length of the input vector.

#### Step Two: Counting Lines
Next, I added support for the `-l` option to count the number of lines. This required iterating through the characters and incrementing the line count whenever a newline character (`\n`) was encountered:

```rust
for c in chars {
    if c == '\n' {
        stats.lines += 1;
    }
}
```

#### Step Three: Counting Words
The `-w` option was a bit more complex, as it required detecting word boundaries. I used a simple state machine to keep track of whether the current character is part of a word:

```rust
let mut in_word = false;
for c in chars {
    if !c.is_whitespace() {
        in_word = true;
    } else if in_word {
        stats.words += 1;
        in_word = false;
    }
}
```

#### Step Four: Counting Characters
The `-m` option counts the number of characters. This is straightforward unless the locale supports multibyte characters. For simplicity, I treated each byte as a character in this implementation.

#### Step Five: Default Behavior
I'm handling flags in a very straightforward:

```rust
let args = env::args().skip(1); // Skips the frist argument in the command (most likely the binary name i.e: ccwd ....)
    let mut flags: Vec<char> = vec![];
    let mut files_paths: Vec<String> = vec![];
    let avaliable_flags = ['c', 'm', 'l', 'L', 'w']; // All avaliable flags

    for arg in args {
        if arg.starts_with('-') { // if the argument start if a - it must be a flag or multiple flags
            for flag in arg.chars().skip(1) { // skiping the -
                flags.push(flag); 
            }
        } else { // otherwise is treated like a file path
            files_paths.push(arg);
        }
    }

    let invalid_flag = flags.iter().find(|flag| !avaliable_flags.contains(flag));
```

If no options are provided, the tool should count bytes, lines, and words by default:

```rust
if flags.is_empty() {
    flags.push('c');
    flags.push('l');
    flags.push('w');
}
```

#### Final Step: Reading from Standard Input
The final feature was to allow the tool to read from standard input if no file is specified:

```rust
let number_of_files = files_paths.len();

if number_of_files < 1 {
    let mut buffer = Vec::new();
    match io::stdin().read_to_end(&mut buffer) {
        Ok(_) => {
            stats.push(Stats::new(buffer, "".to_string())); 
        }, 
        Err(err) => { panic!("Error reading from stdin: {err}")}
    }
}
```

### Conclusion
Building `ccwc` was a rewarding experience that really helped me learning rust. By breaking the project into manageable steps, I was able to incrementally add features and ensure each part worked correctly before moving on.

Feel free to check out the complete source code on my [GitHub repository](https://github.com/Krymancer/ccwc). I hope this post inspires you to tackle similar challenges and build your own command-line tools.

Take care folks!
