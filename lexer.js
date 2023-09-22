const {
  Token,
  ASSIGN,
  SEMICOLON,
  COMMA,
  LBRACE,
  ASTERISK,
  SLASH,
  MINUS,
  PLUS,
  ILLEGAL,
  RPAREN,
  LPAREN,
  RBRACE,
  NOT,
  OR,
  AND,
  EOF,
} = require("./tokens");

class Lexer {
  constructor() {
    this.input;
    this.position = 0;
    this.readPosition = 0;
    this.ch = null;
  }

  init(input) {
    this.input = input;

    // Prime lexer
    this.readChar();
  }

  nextToken() {
    let token;

    this.eatWhitespace();

    switch (this.ch) {
      case "=":
        token = new Token(ASSIGN, this.ch);
        break;
      case ";":
        token = new Token(SEMICOLON, this.ch);
        break;
      case ",":
        token = new Token(COMMA, this.ch);
        break;
      case "{":
        token = new Token(LBRACE, this.ch);
        break;
      case "}":
        token = new Token(RBRACE, this.ch);
        break;
      case "(":
        token = new Token(LPAREN, this.ch);
        break;
      case ")":
        token = new Token(RPAREN, this.ch);
        break;
      case "*":
        token = new Token(ASTERISK, this.ch);
        break;
      case "/":
        token = new Token(SLASH, this.ch);
        break;
      case "-":
        token = new Token(MINUS, this.ch);
        break;
      case "+":
        token = new Token(PLUS, this.ch);
        break;
      case "!":
        token = new Token(NOT, this.ch);
        break;
      case "&":
        if (this.peek() == "&") {
          token = new Token(AND, this.ch + this.peek());
          this.readChar();
          return token;
        }
      case "|":
        if (this.peek() == "|") {
          token = new Token(OR, this.ch + this.peek());
          this.readChar();
          return token;
        }
      case null:
        token = new Token(EOF, this.ch);
        break;
      default:
        token = new Token(ILLEGAL, this.ch);
    }

    this.readChar();

    return token;
  }

  peek() {
    if (this.readPosition >= this.input.lenth) {
      return 0;
    } else {
      return this.input[this.readPosition];
    }
  }

  readChar() {
    if (this.readPosition >= this.input.lenth) {
      this.ch = null;
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition++;
  }

  eatWhitespace() {
    while (isDigit(this.ch) && this.readPosition < this.input.lenth) {
      this.readChar();
    }
  }
}

function isDigit(char) {
  return char >= "0" && char <= "9";
}

module.exports = Lexer;
