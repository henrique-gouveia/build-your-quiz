import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Layout from '@/pages/template/Layout.vue';
import QuizLayout from '@/pages/template/QuizLayout.vue';

import Question from '@/pages/QuestionPage.vue';
import Quiz from '@/pages/QuizPage.vue';
import QuizResponse from '@/pages/QuizResponsePage.vue';
import QuizResult from '@/pages/QuizResultPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/questions',
                component: Question,
            },
            {
                path: '/quizes',
                component: Quiz,
            },
        ],
    },
    {
        path: '/',
        component: QuizLayout,
        children: [
            {
                path: '/quiz/:id',
                component: QuizResponse,
            },
            {
                path: '/quiz/:id/result',
                component: QuizResult,
            },
        ]
    },
    // Not found route
    {
        path: '*',
        redirect: '/'
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
