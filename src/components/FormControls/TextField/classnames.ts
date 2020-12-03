export const inputClassFunc = (hasError: boolean) => ({
	"text-field__input": true,
	"text-field__input--error": hasError,
});

export const labelClassFunc = (hasValue: boolean) => ({
	"text-field__label": true,
	"text-field__label--active": hasValue,
});

export const hintClassFunc = (isHintVisible: boolean, hasError: boolean) => ({
	"text-field__hint": true,
	"text-field__hint--visible": isHintVisible,
	"text-field__hint--error": hasError,
});
