export class Question {
    constructor(text, options, correctAnswer, type) {
        this.text = text;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.type = type;
    }

    getText() {
        return this._text;
    }

    getOptions() {
        return this._options;
    }

    getCorrectAnswer() {
        return this._correctAnswer;
    }

    getType() {
        return this._type;
    }

    isCorrect(answer) {
        return answer === this._correctAnswer;
    }
}
