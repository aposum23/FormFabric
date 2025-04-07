self.onmessage = ({data}: {data: {modelValue: string | boolean, pattern: string}}): void => {
    let result = false;
    if (typeof data.modelValue === 'string') {
        const re = new RegExp(data.pattern);
        result = !re.test(data.modelValue);
    }
    self.postMessage(result);
}