import { IncomingMessage } from 'http'

const domainFromReq = (req: IncomingMessage) => {
    const parts = req.headers.host.split('.')
    parts.shift()
    return `https://${parts.join('.')}`
}
export const apiDomainFromReq = (req: IncomingMessage) => {
    const parts = req.headers.host.split('.')
    parts.shift()
    parts[0] = `${parts[0]}api`
    return `https://${parts.join('.')}`
}
export default domainFromReq
