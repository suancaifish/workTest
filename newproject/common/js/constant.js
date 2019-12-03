export default {
    version: "1.0",
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    toefl: {
        TPO_ROOT: {
            TPO: 3,
            ZTPO: 165,
            NEW_TPO: 813
        },
        /**************根类型，【1】托福【12】GRE****************/
        ROOT: 1,
        /**************听力所有题型全局变量****************/
        LISTEN: {
            SINGLE_QUES_TYPE: 1,                        // 单选题
            MULTIPLE_QUES_TYPE: 2,                      // 多选题
            SORT_QUES_TYPE: 12,                         // 排序题
            DETAIL_QUES_TYPE: 13,                       // 过程细节题
        },
        /**************阅读所有题型全局变量****************/
        READ: {
            SINGLR_CHOICE_QUES_TYPE: 1,                 // 单选题
            MULTIPLE_CHOICE_QUES_TYPE: 2,               // 多选题
            INSERT_QUES_TYPE: 11,                       // 插入题
            SIX_SELECT_THREE_QUES_TYPE: 3,              // 六选三
            SEVEN_SELECT_FIVE_TYPE: 4                   // 七选五
        }
    },
    test: {
        SINGLE_CHOICE_QUESTION_TYPE: 1,
        MULTIPLE_CHOICE_QUESTION_TYPE: 2,
        FILL_BLANK_QUESTION_TYPE: 3,
        AUDIO_UNDERSTAND_QUESTION_TYPE: 5
    }
};
