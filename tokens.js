const ILLEGAL = "ILLEGAL";
const EOF = "EOF";

// Identifiers and Literals
const IDENT = "IDENT";
const INT = "INT";

// Operators
const PLUS = "+";
const MINUS = "-";
const SLASH = "/";
const ASTERISK = "*";
const ASSIGN = "=";
const EQ = "==";
const NOT_EQ = "!=";

// Nogical operators
const NOT = "!";
const AND = "&&";
const OR = "||";

// Delimeters
const SEMICOLON = ";";
const COMMA = ",";
const LPAREN = "(";
const RPAREN = ")";
const LBRACE = "{";
const RBRACE = "}";

// Keywords
const LET = "LET";
const FUNCTION = "FUNCTION";
const IF = "IF";
const ELSE = "ELSE";
const RETURN = "RETURN";
const TRUE = "TRUE";
const FALSE = "FALSE";
const FOR = "FOR";

class Token {
  constructor(type, literal) {
    this.type;
    this.literal;
  }
}

module.exports = {
  // Token
  Token,

  ILLEGAL,
  EOF,

  // Identifiers and Literals
  IDENT,
  INT,

  // Operators
  PLUS,
  MINUS,
  SLASH,
  ASTERISK,
  ASSIGN,
  EQ,
  NOT_EQ,

  // Logical operators
  NOT,
  AND,
  OR,

  // Delimeters
  SEMICOLON,
  COMMA,
  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,

  // Keywords
  LET,
  FUNCTION,
  IF,
  ELSE,
  RETURN,
  TRUE,
  FALSE,
  FOR,
};
