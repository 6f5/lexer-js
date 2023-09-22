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
  lookupIdentifier,
  INT,
  GT_EQ,
  LT_EQ,
  NOT_EQ,
  EQ,
  LT,
  GT,
  STRING,
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
        if (this.peek() === "=") {
          token.type = EQ;
          token.literal = "==";
          this.readChar();
        }
        break;
      case ";":
        token = new Token(SEMICOLON, this.ch);
        break;
      case ",":
        token = new Token(COMMA, this.ch);
        break;
      case ">":
        token = new Token(GT, this.ch);
        if (this.peek() === "=") {
          token.type = GT_EQ;
          token.literal = ">=";
          this.readChar();
        }
        break;
      case "<":
        token = new Token(LT, this.ch);
        if (this.peek() === "=") {
          token.type = LT_EQ;
          token.literal = "<=";
          this.readChar();
        }
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
      case '"':
        token = new Token(STRING, this.readString());
        return token;
      case "+":
        token = new Token(PLUS, this.ch);
        break;
      case "!":
        token = new Token(NOT, this.ch);
        if (this.peek() === "=") {
          token.type = NOT_EQ;
          token.literal = "!=";
          this.readChar();
        }
        break;
      case null:
        token = new Token(EOF, this.ch);
        break;
      default:
        if (isLetter(this.ch)) {
          token = new Token();
          token.literal = this.readIdentifier();
          token.type = lookupIdentifier(token.literal);

          return token;
        } else if (isDigit(this.ch)) {
          token = new Token(INT, this.readNumber());
          return token;
        } else if (this.isLogical()) {
          if (this.ch == "&") {
            token = new Token(AND, "&&");
          } else if (this.ch == "|") {
            token = new Token(OR, "||");
          }
          this.readChar();
        } else {
          token = new Token(ILLEGAL, this.ch);
        }
    }

    this.readChar();

    return token;
  }

  isLogical() {
    const tok = this.ch + this.peek();
    return tok === "||" || tok == "&&";
  }

  peek() {
    if (this.readPosition >= this.input.length) {
      return 0;
    } else {
      return this.input[this.readPosition];
    }
  }
  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = null;
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition++;
  }

  eatWhitespace() {
    while (isSpace(this.ch)) {
      this.readChar();
    }
  }

  readIdentifier() {
    const pos = this.position;
    while (isLetter(this.ch) && this.ch !== null) {
      this.readChar();
    }

    return this.input.substring(pos, this.position);
  }

  readNumber() {
    const pos = this.position;
    while (isDigit(this.ch) && this.ch !== null) {
      this.readChar();
    }

    return this.input.substring(pos, this.position);
  }

  readString() {
    const pos = this.position + 1;
    this.readChar();
    while (this.ch !== '"') {
      this.readChar();
    }
    this.readChar();
    return this.input.substring(pos, this.position - 1);
  }
}

function isDigit(char) {
  return char >= "0" && char <= "9";
}

function isLetter(char) {
  return (
    (char >= "a" && char <= "z") || (char >= "A" && char <= "Z") || char === "_"
  );
}

function isSpace(char) {
  return char === "\n" || char === "\t" || char === " " || char === "\r";
}

module.exports = Lexer;
