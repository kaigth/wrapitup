import query from '../../util/query';

class bgHandler {
    constructor( options ) {
        this.options = options || {};

        this.background = query( '.js-background' )[0];

        this.timeSet = query( '.js-time-set' )[0];

        this.delay = this.options.delay || 400;

        this.flashes = 0;

        this.init();
    }

    init() {
        console.log( 'Set Background Options:', this.options );
    }

    flash( flashes = 2, flashDelay = 1000 ) {
        const callTimeout = () => {
            this.flashTimeout = setTimeout( () => {
                this.flashes += 1;
                this.background.classList.add( 'flash' );
                
                this.flashSubTimeout = setTimeout( () => {
                    this.background.classList.remove( 'flash' );
                    clearTimeout( this.flashSubTimeout );
                }, this.delay );
        
                ( this.flashes >= flashes ) ? clearTimeout( this.flashTimeout ) : callTimeout();
            }, flashDelay );
        };

        callTimeout();
    }

    timeElementSet( time ) {
        this.timeSet.innerHTML = time;
    }

    caution() {
        this.background.classList.add( 'yellow' );
    }

    wrapItUp() {
        this.background.classList.add( 'red' );
    }

    reset() {
        clearTimeout( this.flashTimeout );
        clearTimeout( this.flashSubTimeout );
        this.background.classList.remove( 'flash' );
        this.background.classList.remove( 'yellow' );
        this.background.classList.remove( 'red' );
    }

    teardown() {

    }
}

export default bgHandler;