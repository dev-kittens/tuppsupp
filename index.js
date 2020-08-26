require("dotenv").config();

const Eris = require("eris");

class TuppSuppBot extends Eris.Client {

    async getMessage(channelID, messageID) {
        try {
            return await super.getMessage(channelID, messageID);
        } catch(e) {
            if (e.code != 10008) throw e;
        }
    }

    constructor() {

        super("Bot " + process.env.token, {
            restMode: true,
            allowedMentions: []
        });

        this.rules = require("./rules.json");
        
        this.db = require("./db");
        this.db.init();
        
        require("./utils")(this);

        this.load("events");
        this.load("commands");

        Object.keys(this.events).forEach(event => {
            this.on(event, (...args) => this.events[event](...args, this));
        });

    }

}

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

new TuppSuppBot().connect();