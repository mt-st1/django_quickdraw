// @flow
import React from 'react';

type Props = {
  message: string
};

const HelloMessage = (props: Props) => (
  <h3>
    {props.message}
  </h3>
);

export default HelloMessage;