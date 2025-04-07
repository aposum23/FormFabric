self.onmessage = ({data}: {data: {modelValue: string | boolean, minLength: number}}): void => {
    let result = false;
    if (typeof data.modelValue === 'string') {
        result = data.modelValue.length <= data.minLength;
    }
    self.postMessage(result);
}