// @flow

import * as React from 'react';
import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';
import creatComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';
import Icon from './Icon';

type Props = {
  className?: string,
  classPrefix?: string,
  active?: boolean,
  disabled?: boolean,
  onClick?: Function,
  style?: Object,
  icon?: string | { viewBox: string, id: string },
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  children?: React.Node,
  eventKey?: any,
}

const Component = creatComponent(SafeAnchor);

class NavItem extends React.Component<Props> {

  static displayName = 'NavItem';
  static defaultProps = {
    classPrefix: `${globalKey}nav-item`
  };

  handleClick = (event: SyntheticEvent<*>) => {
    const { onSelect, disabled, eventKey } = this.props;
    if (onSelect && !disabled) {
      onSelect(eventKey, event);
    }
  }

  render() {
    const {
      active,
      disabled,
      onClick,
      className,
      classPrefix,
      style,
      eventKey,
      children,
      icon,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
    }, className);
    const hasIcon = !!icon;

    return (
      <li
        role="presentation"
        className={classes}
        style={style}
      >
        <Component
          {...props}
          role="button"
          className={addPrefix('content')}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleClick)}
        >
          {hasIcon && <Icon icon={icon} className={addPrefix('icon')} />}
          <span className={addPrefix('text')}>{children}</span>
        </Component>
      </li>
    );
  }
}

export default NavItem;
