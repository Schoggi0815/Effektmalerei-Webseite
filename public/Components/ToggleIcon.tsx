import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles';

const clipPath = (value: React.ReactNode) => ({
  WebkitClipPath: value,
  clipPath: value,
});

/**
 * An animated toggle icon.
 */
function ToggleIcon(
  props: {
    offIcon: React.ReactNode;
    onIcon: React.ReactNode;
    on: boolean;
  } & any
) {
  const { classes, className, offIcon, onIcon, on, ...other } = props;

  return (
    <div
      className={`${classes.root} ${className || ''}`}
      {...other}
      style={{
        width: 24,
        height: 24,
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {React.cloneElement(offIcon, {
        className: classes.offIcon,
        style: {
          ...clipPath(
            on
              ? 'polygon(0% 0%, 0% 0%, 0% 0%)'
              : 'polygon(0% 200%, 0% 0%, 200% 0%)'
          ),
          transition:
            'clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1), -webkit-clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        },
      })}
      {React.cloneElement(onIcon, {
        className: classes.onIcon,
        style: {
          ...clipPath(
            on
              ? 'polygon(100% -100%, 100% 100%, -100% 100%)'
              : 'polygon(100% 100%, 100% 100%, 100% 100%)'
          ),
          transition:
            'clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1), -webkit-clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        },
      })}
    </div>
  );
}

export default withStyles({})(ToggleIcon);
