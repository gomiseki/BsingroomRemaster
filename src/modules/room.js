export default class Room{
    connections = []
    constructor(members){
        this.connections.concat(members)
    }
}