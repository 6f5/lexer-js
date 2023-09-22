const {
  Token,
  PLUS,
  MINUS,
  ASTERISK,
  SLASH,
  COMMA,
  SEMICOLON,
  LBRACE,
  RBRACE,
  RPAREN,
  LPAREN,
  OR,
  NOT,
  AND,
  LET,
  EOF,
  FOR,
  IF,
  ELSE,
  RETURN,
  FALSE,
  TRUE,
  INT,
  IDENT,
  GT_EQ,
  LT_EQ,
  NOT_EQ,
  EQ,
  GT,
  LT,
} = require("../tokens");
const Lexer = require("../lexer");

test("should tokenize arithmetic operators", () => {
  const source = "+ - * /";
  const expectedTokens = [
    new Token(PLUS, "+"),
    new Token(MINUS, "-"),
    new Token(ASTERISK, "*"),
    new Token(SLASH, "/"),
    new Token(EOF, null),
  ];

  const lexer = new Lexer();
  lexer.init(source);

  for (let et of expectedTokens) {
    const token = lexer.nextToken();
    expect(et).toEqual(token);
  }
});

test("should tokenize delimeters", () => {
  const source = "; ,{) ( }";

  const expectedTokens = [
    new Token(SEMICOLON, ";"),
    new Token(COMMA, ","),
    new Token(LBRACE, "{"),
    new Token(RPAREN, ")"),
    new Token(LPAREN, "("),
    new Token(RBRACE, "}"),
    new Token(EOF, null),
  ];

  const lexer = new Lexer();
  lexer.init(source);

  for (let et of expectedTokens) {
    token = lexer.nextToken();
    expect(token).toEqual(et);
  }
});

test("should tokenize logical operators", () => {
  const source = "&& || !";

  const expectedTokens = [
    new Token(AND, "&&"),
    new Token(OR, "||"),
    new Token(NOT, "!"),
    new Token(EOF, null),
  ];

  const lexer = new Lexer();
  lexer.init(source);

  for (let et of expectedTokens) {
    const token = lexer.nextToken();
    expect(token).toEqual(et);
  }
});

test("should tokenize comparison operators", () => {
  const source = "> < >= <= != ==";

  const expectedTokens = [
    new Token(GT, ">"),
    new Token(LT, "<"),
    new Token(GT_EQ, ">="),
    new Token(LT_EQ, "<="),
    new Token(NOT_EQ, "!="),
    new Token(EQ, "=="),
    new Token(EOF, null),
  ];

  const lexer = new Lexer();
  lexer.init(source);

  for (let et of expectedTokens) {
    const token = lexer.nextToken();
    expect(token).toEqual(et);
  }
});

test("should tokenize identifiers", () => {
  const source = "name age balance";

  const expectedTokens = [
    new Token(IDENT, "name"),
    new Token(IDENT, "age"),
    new Token(IDENT, "balance"),
    new Token(EOF, null),
  ];

  const lexer = new Lexer();
  lexer.init(source);

  for (let et of expectedTokens) {
    const token = lexer.nextToken();
    expect(token).toEqual(et);
  }
});

test("should tokenize literals", () => {
  const source = "10 20 30";

  const expectedTokens = [
    new Token(INT, "10"),
    new Token(INT, "20"),
    new Token(INT, "30"),
    new Token(EOF, null),
  ];

  const lexer = new Lexer();
  lexer.init(source);

  for (let et of expectedTokens) {
    const token = lexer.nextToken();
    expect(token).toEqual(et);
  }
});

test("should tokenize keywords", () => {
  const source = "let for if else return false true";

  const expectedTokens = [
    new Token(LET, "let"),
    new Token(FOR, "for"),
    new Token(IF, "if"),
    new Token(ELSE, "else"),
    new Token(RETURN, "return"),
    new Token(FALSE, "false"),
    new Token(TRUE, "true"),
    new Token(EOF, null),
  ];

  const lexer = new Lexer();
  lexer.init(source);

  for (let et of expectedTokens) {
    const token = lexer.nextToken();
    expect(token).toEqual(et);
  }
});
