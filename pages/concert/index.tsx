import { GetServerSideProps } from 'next'
import React from 'react'

const Index: React.FC = () => null
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader('location', process.env.NEXT_APP_APP_URL)
    res.statusCode = 302
    res.end()
    return { props: {} }
}
export default Index
