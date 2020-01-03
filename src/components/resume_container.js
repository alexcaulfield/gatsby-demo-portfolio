import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import ResumeItem from '../components/resume_item'

const ResumeContainer = () => {
  const data = useStaticQuery(graphql`
    query resumeQuery {
      allGoogleSheetResumeRow {
        edges {
          node {
            details
            enddate
            startdate
            position
            place
            location
          }
        }
      }
    }
  `)
  
  return (
    <>
      <h1 class="ui header">Work Experience</h1>
      {data.allGoogleSheetResumeRow.edges.map(({node}) => <ResumeItem {...node} />)}
    </>
  )
}

export default ResumeContainer