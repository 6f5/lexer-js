const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

require("colors");

const Lexer = require("./lexer");
const { EOF } = require("./tokens");

const PROMPT = "> ";
const CONTINUE_PROMPT = "... ";

function startREPL() {
  let source = ""; // Store the source

  rl.setPrompt(source ? CONTINUE_PROMPT : PROMPT);
  rl.prompt();

  rl.on("line", (line) => {
    if (line.trim() === "exit" || line.trim() === ".exit") {
      rl.close();
    }
    if (line.trim() === "--") {
      // If the user enters "--", evaluate the source

      const lexer = new Lexer();
      lexer.init(source);

      const tokens = [];
      let token = lexer.nextToken();
      while (token.type !== EOF) {
        tokens.push(token);
        token = lexer.nextToken();
      }

      // console.log(JSON.stringify(tokens, null, 2));
      console.log(tokens);

      source = ""; // Reset the source
    } else {
      source += line + "\n"; // Append the line to the source
    }

    rl.setPrompt(source ? CONTINUE_PROMPT : PROMPT);
    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Exiting the REPL.");
    process.exit(0);
  });
}

module.exports = { startREPL };
