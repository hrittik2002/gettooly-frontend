import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    formTitle: "",
    formCode : "",
    formCreator : "",
    bgColor : "",
    formDescription: "Untiled Description",
    questions: [
      {
        questionText: "Untitled question ? ",
        questionType: "radio",
        id : "",
        options: [
          { optionText: "Option 1" , id : "" , isAnswer : false },
          { optionText: "Option 2" , id : "" , isAnswer : false },
          { optionText: "Option 3" , id : "" , isAnswer : false },
        ],
        answer: false,
        answerKey: "",
        points: 0,
        open: true,
        required: false,
      },
    ],
  },
  reducers: {
    setFormTitle: (state, action) => {
      state.formTitle = action.payload;
    },
    setFormDescription: (state, action) => {
      state.formDescription = action.payload;
    },
    setFormCode: (state, action) => {
      state.formCode = action.payload;
    },
    setBackgroundColor : (state , action) => {
      
      state.bgColor = action.payload;
      //console.log("holaaaaaaaaaaaaaaaaaaaaaa")
      //console.log(state.bgColor)
      //console.log(action.payload);
    },
    setFormCreator: (state, action) => {
      state.formCreator = action.payload;
    },
    setQuestions: (state, action) => {
      //console.log("hii");
      state.questions = action.payload;
    },
    expandCloseAllHandler: (state) => {
      const qs = [...state.questions];
      for (let j = 0; j < qs.length; j++) {
        qs[j].open = false;
      }
      state.questions = qs;
    },
    handleExpandHandler: (state, action) => {
      const i = action.payload.i;
      let qs = [...state.questions];
      for (let j = 0; j < qs.length; j++) {
        if (i === j) {
          qs[i].open = true;
        } else {
          qs.open = false;
        }
      }
      state.questions = qs;
    },
    changeQuestionHandler: (state, action) => {
      let newQuestion = [...state.questions];
      newQuestion[action.payload.i].questionText = action.payload.text;
      state.questions = newQuestion;
    },
    addQuestionTypeHandler: (state, action) => {
      const idx = action.payload.i;
      const type = action.payload.type;
      let newQuestion = [...state.questions];
      newQuestion[idx].questionType = type;
      state.questions = newQuestion;
    },
    changeOptionValueHandler: (state, action) => {
      const i = action.payload.i;
      const j = action.payload.j;
      const text = action.payload.text;
      let optionsQuestion = [...state.questions];
      optionsQuestion[i].options[j].optionText = text;
      state.questions = optionsQuestion;
    },
    removeOptionHandler: (state, action) => {
      const i = action.payload.i;
      const j = action.payload.j;
      let RemoveOptionQuestion = [...state.questions];
      if (RemoveOptionQuestion[i].options.length > 1) {
        RemoveOptionQuestion[i].options.splice(j, 1);
        state.questions = RemoveOptionQuestion;
        //console.log(i , j);
      }
    },
    addOptionHandler: (state, action) => {
      const i = action.payload.i;
      let optionOfQuestion = [...state.questions];
      if (optionOfQuestion[i].options.length < 5) {
        optionOfQuestion[i].options.push({
          optionText: "Option " + (optionOfQuestion[i].options.length + 1),
        });
      } else {
        console.log("Max 5 options");
      }
      state.questions = optionOfQuestion;
    },
    copyQuestionHandler: (state, action) => {
      // err
      const i = action.payload.i;
      let qs = [...state.questions];
      let newQuestion = { ...qs[i] };
      state.questions = [...state.questions, newQuestion];
    },
    deleteQuestionHandler: (state, action) => {
      // err
      console.log(state.questions);
      const i = action.payload.i;
      let qs = [...state.questions];
      console.log(qs);
      if (qs.length > 1) {
        console.log(i);
        qs.splice(i, 1); //
      }
      state.questions = qs;
    },
    requiredQuestionHandler: (state, action) => {
      const i = action.payload.i;
      let reqQuestion = [...state.questions];
      reqQuestion[i].required = !reqQuestion[i].required;
      console.log(reqQuestion[i].required + " " + i);
      //setQuestions(reqQuestion);
      state.questions = reqQuestion;
    },
    setOptionAnswerHandler: (state, action) => {
      const ans = action.payload.ans;
      const qno = action.payload.qno;
      let Question = [...state.questions];
      Question[qno].answerKey = ans;
      state.questions = Question;
    },
    addAnswerHandler: (state, action) => {
      const i = action.payload.i;
      let answerOfQuestion = [...state.questions];
      answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
      state.questions = answerOfQuestion;
    },
    doneAnswerHandler: (state, action) => {
      const i = action.payload.i;
      let answerOfQuestion = [...state.questions];
      answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
      state.questions = answerOfQuestion;
    },
  },
});

export const {
  setFormCode,
  setFormCreator,
  setFormTitle,
  setBackgroundColor,
  setFormDescription,
  setQuestions,
  changeQuestionHandler,
  addQuestionTypeHandler,
  changeOptionValueHandler,
  removeOptionHandler,
  addOptionHandler,
  expandCloseAllHandler,
  handleExpandHandler,
  copyQuestionHandler,
  deleteQuestionHandler,
  requiredQuestionHandler,
  addAnswerHandler,
  doneAnswerHandler,
  setOptionAnswerHandler,
} = questionsSlice.actions;
export default questionsSlice.reducer;
