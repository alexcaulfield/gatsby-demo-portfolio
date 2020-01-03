import React from 'react'
import { 
  Item, 
  Header, 
} from 'semantic-ui-react';


const ResumeItem = ({
  place,
  location,
  position,
  details,
  startdate,
  enddate
}) => {
  const detailsArray = details.split(/\n/g)
  return (
    <div>
      <Item.Group divided>
        <Item>
          <Item.Content>
            <Item.Header as='a'>{position}</Item.Header>
            <Item.Meta><Header size='small'>{place}</Header></Item.Meta>
            <Item.Meta>{startdate} - {enddate ? enddate : 'Present'}</Item.Meta>
            <Item.Meta>{location}</Item.Meta>
            {detailsArray.map(detail => {
              return <Item.Description>{detail}</Item.Description>
            })}
          </Item.Content>
        </Item>
      </Item.Group>
      <br />
    </div>
  )
}

export default ResumeItem