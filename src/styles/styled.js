import { makeStyles } from '@material-ui/core/styles';

export const useStylesContainer = makeStyles((theme) => ({
  root: {
    padding: '25px 20px 0 20px',
    [theme.breakpoints.up('md')]: {
      padding: '50px 50px 0 50px'
    }
  }
}));

export const useStylesIconLion = makeStyles({
  root: {
    width: '50px',
    marginRight: '10px',
    display: 'inline-block',
    verticalAlign: 'baseline'
  }
});

export const useStylesCard = makeStyles({
  root: {
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
  }
});

export const useStylesTarget = makeStyles({
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  },
  root: {
    margin: '15px auto',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #e6a35e',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: '$spin 2s linear infinite'
  }
});
