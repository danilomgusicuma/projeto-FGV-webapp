import io from 'socket.io-client'

const socket = io('http://localhost:3000')//http://api.desafiosdegestao.com.br:3000')
socket.on('connect', () => {
                            socket.emit('teste', 'ID: ' + socket.id + ' (REACT-APP connected with SOCKET)')
                           })
export default socket;//177000000