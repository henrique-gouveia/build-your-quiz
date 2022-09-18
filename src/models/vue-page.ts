import Vue from 'vue'

export default class VuePage extends Vue {
    protected showSuccess(message: string | null = ''): void {
        this.$toasted.global.showSuccess({ message });
    }

    protected showError(e: any | null = null): void {
        if (e && e.response && e.response.data && typeof e.response.data === 'string') {
            this.$toasted.global.showError({ message: e.response.data })
        } else if (typeof e === 'string') {
            this.$toasted.global.showError({ message: e })
        } else {
            this.$toasted.global.showError()
        }
    }
}
