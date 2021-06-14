import React, { useEffect } from 'react';

import { searchParams } from '../utils/searchParams';

import { fade, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: fade(theme.palette.common.white, 0.25),
    color: theme.palette.common.white,
  },
}));

export default function SearchChip(props) {
  const classes = useStyles();

  const attributeProp = props.chipData[0], powerLevelProp = props.chipData[1];

  
  const [chipData, setChipData] = React.useState([]);
  
  useEffect(() => {
    handleCreateChips()
  }, [props.chipData]);
  
  
  const handleCreateChips = () => {
    const attribute = attributeProp ? attributeProp : 'All';
    const powerLevel = powerLevelProp ? powerLevelProp : 9;
    
    //Check for previous attribute and replace if duplicate with new value
    let replace = false;
    const newChipData = chipData.map(item => {
      if(item.label === attribute) {
        replace = true;
        return { key: item.key, label: attribute, value: powerLevel }
      } 
      return item;
    });
    
    // Create chipdata if new attribute
    if (!replace) {
      const chip = { key: chipData.length, label: attribute, value: powerLevel };
      newChipData[newChipData.length] = chip;
    }
    setChipData(newChipData);

    if (attribute !== 'All'  && powerLevel !== 9) {
      searchParams(attribute, powerLevel, props.updateSearchParams)
    }
  }

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    searchParams(chipToDelete.label, '', props.updateSearchParams)
  };

  return (
    <Paper component='ul' className={classes.root}>
      {chipData.length > 0 
      ? chipData.map((data, index) => {
        
        return (
          <li key={data.key + index}>
            <Chip
              label={`${data.label}: ${data.value}`}
              onDelete={handleDelete(data)}
              className={classes.chip}
              size='small'
            />  
          </li>
        )
      })
      : null
    }
    </Paper>
  )
}
