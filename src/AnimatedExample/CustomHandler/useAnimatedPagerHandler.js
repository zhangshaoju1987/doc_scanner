import { useEvent, useHandler } from 'react-native-reanimated';
export function useAnimatedPagerScrollHandler(handlers, dependencies) {
    const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
    return useEvent((event) => {
        'worklet';
        const { onPageScroll } = handlers;
        if (onPageScroll &&
            event.eventName.endsWith('onPageScroll')) {
            onPageScroll(event, context);
        }
    }, ['onPageScroll'], doDependenciesDiffer);
}
export function useAnimatedPagerScrollStateHandler(handlers, dependencies) {
    const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
    return useEvent((event) => {
        'worklet';
        const { onPageScrollStateChanged } = handlers;
        if (onPageScrollStateChanged &&
            event.eventName.endsWith('onPageScrollStateChanged')) {
            onPageScrollStateChanged(event, context);
        }
    }, ['onPageScrollStateChanged'], doDependenciesDiffer);
}
export function useAnimatedPagerSelectedPageHandler(handlers, dependencies) {
    const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
    return useEvent((event) => {
        'worklet';
        const { onPageSelected } = handlers;
        if (onPageSelected &&
            event.eventName.endsWith('onPageSelected')) {
            onPageSelected(event, context);
        }
    }, ['onPageSelected'], doDependenciesDiffer);
}
