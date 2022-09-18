import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $cookies: any
        $toasted: any
        $bvModal: any
    }

    interface VueConstructor {
        cookies: any
        toasted: any
    }
}
