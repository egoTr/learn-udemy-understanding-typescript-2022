namespace ProjectManager {
    // Auto-bind decorator ------------------------------------------- START
    /* Usage:
    @autobind
    private submitHandler() {}
    private configure() {
        this.form.addEventListener('submit', this.submitHandler);
    }
    */
    export function autobind(target: any, method: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            } // get
        }; // adjDescriptor

        return adjDescriptor;
    } // autobind
    // Auto-bind decorator ------------------------------------------- END
}