import { FC, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionAnimationProps } from './TransitionAnimation.types';
import { getTransitionAnimationStyle } from './TransitionAnimationStyles';

export const TransitionAnimation: FC<TransitionAnimationProps> = props =>
{
    const { type = null, inProp = false, timeout = 300, className = null, children = null } = props;

    const [ isChildrenVisible, setChildrenVisible ] = useState(false);

    useEffect(() =>
    {
        let timeoutData: ReturnType<typeof setTimeout> = null;

        if(inProp)
        {
            setChildrenVisible(true);
        }
        else
        {
            timeoutData = setTimeout(() =>
            {
                setChildrenVisible(false);
                clearTimeout(timeout);
            }, timeout);
        }

        return () =>
        {
            if(timeoutData) clearTimeout(timeoutData);
        }
    }, [ inProp, timeout ]);

    return (
        <Transition in={ inProp } timeout={ timeout }>
            { state => (
                <div className={ (className ?? '') + " animate__animated" } style={ { ...getTransitionAnimationStyle(type, state, timeout) } }>
                    { isChildrenVisible && children }
                </div>
            )}
        </Transition>
    );
}
