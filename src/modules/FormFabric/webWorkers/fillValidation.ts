self.onmessage = ({data}: {data: {modelValue: string | boolean}}): void => {
    const result: boolean = data.modelValue !== undefined && !data.modelValue;
    self.postMessage(result);
}