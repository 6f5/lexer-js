const { startREPL } = require("./repl");

function main() {
  console.log("\n\tSanaa Programming Language - REPL\n".bold);
  console.log("Type: " + "exit".red.bold + " to exit the REPL\n");
  console.log("Type: " + "--".green.bold + " to evaluate\n");
  console.log("Feel free to type commands.\n".blue);

  startREPL();
}

main();
