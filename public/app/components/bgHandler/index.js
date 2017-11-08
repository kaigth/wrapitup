import query from '../../util/query';

/**
 * 
 * @export
 * @description The background handler.
 * @class bgHandler
 * 
 */
export default class bgHandler {
    constructor( options ) {
        this.options = options || {};

        this.background = query( '.js-background' )[ 0 ];

        this.timeSet = query( '.js-time-set' )[ 0 ];

        this.delay = this.options.delay || 400;

        this.flashes = 0;

        this.init();
    }

    /**
     * 
     * @description Intialize the handler and events.
     * @memberof bgHandler
     * 
     */
    init() {
        console.log( 'Set Background Options: ', this.options );
    }

    /**
     * 
     * @description Manage flashing of the background.
     * @param {number} [flashes=2] How many times does it flash.
     * @param {number} [flashDelay=1000] The delay in which each flashes occurs.
     * @memberof bgHandler
     * 
     */
    flash( flashes = 2, flashDelay = 1000 ) {
        const callTimeout = () => {
            this.flashTimeout = setTimeout( () => {
                this.flashes += 1;
                this.background.classList.add( 'flash' );
                
                this.flashSubTimeout = setTimeout( () => {
                    this.background.classList.remove( 'flash' );
                    clearTimeout( this.flashSubTimeout );
                }, this.delay );
        
                ( this.flashes >= flashes ) ? this.softReset() : callTimeout();
            }, flashDelay );
        };

        callTimeout();
    }

    /**
     * 
     * @description Set the current time to the element.
     * @param {String} time Time left in minutes.
     * @memberof bgHandler
     * 
     */
    timeElementSet( time ) {
        this.timeSet.innerHTML = time;
    }

    /**
     * 
     * @description Set the background color to caution yellow.
     * @memberof bgHandler
     * 
     */
    caution() {
        this.background.classList.add( 'yellow' );
    }

    /**
     * 
     * @description Set the background color to wrapitup red.
     * @memberof bgHandler
     * 
     */
    wrapItUp() {
        this.background.classList.add( 'red' );
    }

    /**
     * 
     * @description Soft reset the flashes and timeout.
     * @memberof bgHandler
     * 
     */
    softReset() {
        this.flashes = 0;
        clearTimeout( this.flashTimeout );
    }

    /**
     * 
     * @description Reset the background to the defaults.
     * @memberof bgHandler
     * 
     */
    reset() {
        this.flashes = 0;
        clearTimeout( this.flashTimeout );
        clearTimeout( this.flashSubTimeout );
        this.background.classList.remove( 'flash' );
        this.background.classList.remove( 'yellow' );
        this.background.classList.remove( 'red' );
    }

    /**
     * 
     * @description Teardown the entire experience.
     * @memberof bgHandler
     * 
     */
    teardown() {
        this.options = null;
        this.background = null;
        this.timeSet = null;
        this.delay = null;
        this.flashes = null;
    }
}
