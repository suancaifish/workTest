// const apiRoot = "https://toefl.weixue100.com/";
// const root = "https://api.weixue100.com/";
const apiRoot = "https://pro.wisharedu.com/";
const root = "https://api.wisharedu.com/";
const api = {
    // 首页接口
    default: {
        login: `${apiRoot}wxapp/default/login`,
        banner: `${apiRoot}wxapp/default/banner`,
        checkssk: `${apiRoot}wxapp/default/check-ssk`,
        levelList: `${apiRoot}wxapp/category/level-list`,
        getList: `${apiRoot}wxapp/category/get-list`,
        getDetail: `${apiRoot}wxapp/diy/get-detail`,
        getSubject: `${apiRoot}wxapp/diy/get-subject`,
        addPic:`${root}toefl/default/poster`
    },

    user: {
        bind: `${apiRoot}wxapp/user/bind`,
        unbind: `${apiRoot}wxapp/user/un-bind`,
        verify: `${apiRoot}wxapp/user/verify`,
        register: `${apiRoot}wxapp/user/register`,
        checkPhone: `${apiRoot}wxapp/user/check-phone`,
        changePassword: `${apiRoot}wxapp/user/change-password`,
        code: `${apiRoot}wxapp/user/code`,
        setUnion: `${apiRoot}wxapp/user/set-union`,
        getCache: `${apiRoot}wxapp/user/get-cache`,
        collect: `${apiRoot}wxapp/my/collect`,
        userInfo: `${apiRoot}wxapp/user/user-info`,
        notifyCategories: `${apiRoot}wxapp/user/notify-categories`,
        notifyList: `${apiRoot}wxapp/user/notify-list`,
        setCateRead: `${apiRoot}wxapp/user/set-cate-read`,
        authExam: `${apiRoot}wxapp/record/auth-exam`,
        bindInfo: `${apiRoot}wxapp/user/bind-info`
    },

    feedback: {
        cate: `${apiRoot}wxapp/feedback/cate`,
        alioss: `${apiRoot}wxapp/feedback/alioss`,
        post: `${apiRoot}wxapp/feedback/post`,
    },

    collect: {
        addFavorite: `${apiRoot}wxapp/favorite/add-favorite`,
        deleteFavorite: `${apiRoot}wxapp/favorite/delete-favorite`
    },

    listen: {
        exercise: `${root}toefl/listen/exercise`,
        detail: `${apiRoot}wxapp/listen/detail`,
        submit: `${apiRoot}wxapp/listen/submit`,
        order: `${apiRoot}wxapp/listen/order`,
        list: `${apiRoot}wxapp/listen/list`,
        zOrder: `${apiRoot}wxapp/listen/z-order`,
        zList: `${apiRoot}wxapp/listen/z-list`,
        newOrder: `${apiRoot}wxapp/listen/new-order`,
        newList: `${apiRoot}wxapp/listen/new-list`,
        play: `${apiRoot}wxapp/listen/play`
    },

    read: {
        exercise: `${root}toefl/read/exercise`,
        detail: `${apiRoot}wxapp/read/detail`,
        submit: `${apiRoot}wxapp/read/submit`,
        order: `${apiRoot}wxapp/read/order`,
        list: `${apiRoot}wxapp/read/list`,
        zOrder: `${apiRoot}wxapp/read/z-order`,
        zList: `${apiRoot}wxapp/read/z-list`,
        newOrder: `${apiRoot}wxapp/read/new-order`,
        newList: `${apiRoot}wxapp/read/new-list`
    },

    speaking: {
        postExercise: `${apiRoot}wxapp/speaking/post-exercise`,
        exercise: `${root}toefl/speak/exercise`,
        result: `${apiRoot}wxapp/speaking/result`,
        list: `${apiRoot}wxapp/speaking/list`,
        order: `${apiRoot}wxapp/speaking/order`,
    },
    wrongNote: {
        wrongIndex: `${apiRoot}wxapp/record/wrong-index`,
        readWrong: `${apiRoot}wxapp/record/read-wrong`,
        listenWrong: `${apiRoot}wxapp/record/listen-wrong`,
        specialWrong: `${apiRoot}wxapp/record/special-wrong`,
        delWrong: `${apiRoot}wxapp/record/wrong-del`,
        readWrongDet: `${apiRoot}wxapp/record/read-wrong-detail`,
        listenWrongDet: `${apiRoot}wxapp/record/listening-wrong-detail`,
        specialWrongDet: `${apiRoot}wxapp/record/special-wrong-detail`,
    },
    favorite: {
        volumeIndex: `${apiRoot}course/collection/volume-type-total`,
        volumeList: `${apiRoot}course/collection/volume-list`,
        volumeUpdata: `${apiRoot}course/collection/volume-update`,
        volumeProgress: `${apiRoot}course/volume/volume-progress`,
        readFav: `${apiRoot}wxapp/favorite/read-collect-record`,
        listenFav: `${apiRoot}wxapp/favorite/listen-collect-record`,
        collectFav: `${apiRoot}wxapp/favorite/count-collect`
    },

    special: {
        data: `${apiRoot}wxapp/special/data`,
        exercise: `${root}toefl/special/exercise`,
        submit: `${apiRoot}wxapp/special/submit`,
        list: `${apiRoot}wxapp/special/list`,
        check: `${apiRoot}wxapp/special/check`,
        self: `${apiRoot}wxapp/special/self`,
        setTotal: `${apiRoot}wxapp/special/set-total`,
        postExercise: `${apiRoot}wxapp/special/post-exercise`,
        exerciseVocab: `${root}toefl/special/exercise-vocab`,
        getHistory: `${apiRoot}wxapp/special/get-history`,
        answerTotal: `${apiRoot}wxapp/special/answer-total`,
        getVocab: `${root}toefl/special/get-vocab`,
        saveRecite: `${root}toefl/special/save-recite`,
        vocabList: `${root}toefl/special/vocab`,
        updateRecite: `${root}toefl/special/update-recite`,
        getRecite:`${root}toefl/special/get-recite`
    },

    record: {
        wrongIndex: `${apiRoot}wxapp/record/wrong-index`,
        answerCount: `${apiRoot}wxapp/record/answer-count`,
        lastAnswer: `${apiRoot}wxapp/record/last-answer`
    },

    upload: {
        alioss: `${apiRoot}wxapp/upload/alioss`
    },
    live: {
        liveList: `${apiRoot}course/live/live-list`, // 直播列表接口
        liveApplyRecord: `${apiRoot}course/live/apply-record`, // 直播预约列表
        liveApply: `${apiRoot}course/live/live-apply`, // 预约直播接口
        liveInfo: `${apiRoot}course/live/info`,
        getApplyStatus: `${apiRoot}course/live/apply-status`,
        liveViews: `${apiRoot}course/live/live-views`
    },
    play: {
        playList: `${apiRoot}course/volume/list`, // 资源卷列表接口
        playInfo: `${apiRoot}course/volume/info`,
        playVolumeRecord: `${apiRoot}course/volume/volume-record`,
        playCreateVolume: `${apiRoot}course/volume/volume-rec-update`, // 创建卷
        playUpdateSection: `${apiRoot}course/volume/item-rec-update`,
        playVideoTs: `${apiRoot}course/volume/video-ts`,
        playCloudList: `${apiRoot}course/volume/cloud-list`,
        playFileList: `${apiRoot}course/volume/file-list`,
        playCollectVolumeStatus: `${apiRoot}course/collection/volume-status`,
        playVolumeRecommend: `${apiRoot}course/volume/recommend`
    },
    glossary: {
        glossarylist: `${apiRoot}wxapp/glossary/glossary-list`,
        search: `${apiRoot}lexicon/default/search`,
        delglossary: `${apiRoot}wxapp/glossary/del-glossary`
    },
    homework: {
        apiDetail: `${root}teaching/homework/api-detail`,
        submitHomework: `${apiRoot}wxapp/homework/submit-homework`,
        addResource: `${apiRoot}wxapp/homework/add-resource`,
        delete: `${apiRoot}wxapp/homework/delete-resource`,


        writingResult: `${root}toefl/write/result`, //获取写作结果
        correctInfo: `${root}teaching/homework/correct`, //口语写作获取批改信息

        //教师端用
        teacher: {
            unCorrect: `${root}teaching/homework/un-correct`, //待批改
            info: `${root}teaching/homework/info`, //作业详情
            updateCorrectFile: `${root}teaching/homework/update-correct-file`,
            studentCorrect: `${root}teaching/homework/student-correct`, //当前学生和下一份
            toeflResult: `${root}teaching/homework/toefl-result`,
            correctHandle: `${root}teaching/homework/correct-handle`,
        },
        //homework测试接口用

        index: {
            // 首页
            getClassList: `${root}teaching/class/user-class`,
            getCourseList: `${root}teaching/course/list`,
            getHomework: `${root}teaching/homework/list`
        },
        classDetails: {
            // 详情
            getVideoList: `${root}teaching/course/video-list`,
            updateVideoLog: `${root}teaching/course/save-video-log`
        },
        allPlan: {
            // 全部安排
            getSchedule: `${root}teaching/schedule/single-list`,
            getAllSchedule: `${root}teaching/schedule/all-list`
        }
    },
    test: {
        itemList: `${root}testing/exam/item-list`,
        getExercise: `${root}testing/exam/get-exercise`,
        checkVerifyCode: `${root}testing/exam/check-verify-code`,
        postExercise: `${root}testing/exam/post-exercise`,
        postOverTimeExam: `${root}testing/exam/post-over-time-exam`,
        answerList: `${root}testing/exam/answer-list`,
        answerResult: `${root}testing/exam/answer-result`,
        analysis: `${root}testing/exam/analysis`,
        answerQuestionList: `${root}testing/exam/answer-question-list`
    },
    course: {
        //课程计划详情
        getCoursePlanView: `${root}courseplan/plan/view`,
        //课程列表
        getCoursePlanList: `${root}courseplan/plan/list`,
        getUserPlanList: `${root}courseplan/plan/user-plan-list`


    },
    order: {
        //获取订单列表
        getOrderList: `${root}courseplan/order/get-list`,
        //加入免费班级 post
        addFreeClass:`${root}courseplan/order/add-class`,
        //取消订单接口 post
        cancelOrder:`${root}courseplan/order/cancel-order`,
        //创建订单接口 post
        createOrder:`${root}courseplan/order/create-order`,
        //检查支付是否成功
        checkPay:`${root}courseplan/order/check-pay`,
        //获取支付信息
        getPay:`${root}courseplan/order/get-pay`
        
    }
};
export default api;