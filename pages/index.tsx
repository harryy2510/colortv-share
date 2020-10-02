import { GetServerSideProps } from 'next'
import React from 'react'
import domainFromReq from '../utils/domainFromReq'

const Index: React.FC = () => null
export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
    res.setHeader('location', domainFromReq(req))
    res.statusCode = 302
    res.end()
    return { props: {} }
}
export default Index
