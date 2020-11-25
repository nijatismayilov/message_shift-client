class EventBus {
	public on(event: string, callback: Function) {
		document.addEventListener(event, (e) => callback((e as any).detail));
	}

	public dispatch(event: string, data: any) {
		document.dispatchEvent(new CustomEvent(event, { detail: data }));
	}

	public remove(event: string, callback: any) {
		document.removeEventListener(event, callback);
	}
}

export default new EventBus();
