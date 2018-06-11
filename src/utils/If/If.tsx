import React from 'react';

export const If: React.SFC<{ condition: any, children: any }> = (props) => {
    const { condition, children } = props;

    return !!condition && children;
};
