import query from '../../util/query';
import bgHandler from '../bgHandler/index';

/**
 * 
 * @export
 * @description The main class for the admin panel.
 * @class admin
 * 
 */
export default class admin {
    constructor( element ) {
        this.element = element;

        this.raf = val => window.requestAnimationFrame(val);
        
        this.xraf = val => window.cancelAnimationFrame(val);

        this.time = query( '.js-time', this.element )[ 0 ];

        this.cautionTime = query( '.js-caution', this.element )[ 0 ];

        this.start = query( '.js-start', this.element )[ 0 ];

        this.reset = query( '.js-reset', this.element )[ 0 ];

        this.timer = 0;

        this.cautionTimer = 0;

        this.flashCaution = 3;

        this.flashWrapItUp = 999;

        this.running = false;

        this.started = null;

        this.caution = false;

        this.WrapItUp = 'Wrap it up';

        this.bgController = new bgHandler();

        this.init();
    }

    /**
     * 
     * @description Initialize the class and events.
     * @memberof admin
     * 
     */
    init() {
        console.warn( 'Admin initialized.' );

        this.start.addEventListener( 'click', this.go.bind( this ) );
        this.reset.addEventListener( 'click', this.restart.bind( this ) );
    }

    /**
     * 
     * @description Start the timer and close the admin panel.
     * @param {Event} event The passed down event.
     * @returns 
     * @memberof admin
     * 
     */
    go( event ) {
        if ( !this.time.value || this.cautionTime.value <= 0 ) return;

        this.openAdminPanel();
        this.reset.classList.remove( 'is-inactive' );

        this.timer = this.time.value;
        this.cautionTimer = this.cautionTime.value;
        
        this.parseTime();
    }

    /**
     * 
     * @description Parse the time that is passed in to the input.
     * @memberof admin
     * 
     */
    parseTime() {
        this.timer = parseInt( this.timer, 10 ) * 60000;
        this.cautionTimer = parseInt( this.cautionTimer, 10 ) * 60000 / 1000;

        this.initCountdown();
    }

    /**
     * 
     * @description Initialize the countdown process.
     * @memberof admin
     * 
     */
    initCountdown() {
        this.countdown();
    }

    /**
     * 
     * @description Process the countdown.
     * @memberof admin
     * 
     */
    countdown() {
        const end = 0;
        this.running = true;
        let currentTime = 0;

        const init = now => {
            if ( this.running ) {
                if ( !this.started ) this.started = now;
                const difference = (now - this.started);
                const remainder = Math.ceil( ( this.timer - difference ) / 1000 );
                const trueRemainder = Math.ceil( remainder / 60 );

                if ( currentTime !== trueRemainder ) {
                    this.timeUpdate( trueRemainder );

                    currentTime = trueRemainder;
                };

                if ( remainder < this.cautionTimer && !this.caution ) this.cautionCountdown();

                if ( remainder <= end ) this.resetCountdown();

                this.raf( init );
            }
        }

        this.raf( init );
    }

    /**
     * 
     * @description 
     * @param {Integer} remainder Update the time displayed to the user.
     * @memberof admin
     * 
     */
    timeUpdate( remainder ) {
        this.bgController.timeElementSet(
            (remainder <= 0)
            ? this.WrapItUp
            : `${ remainder } ${ remainder <= 1 ? 'minute' : 'minutes' }`
        );
    }

    /**
     * 
     * @description Instantiate the caution experience.
     * @memberof admin
     * 
     */
    cautionCountdown() {
        this.bgController.flash( this.flashCaution );
        this.bgController.caution();
        this.caution = true;
    }

    /**
     * 
     * @description Instantiate the wrapitup experience.
     * @memberof admin
     * 
     */
    resetCountdown() {
        this.bgController.flash( this.flashWrapItUp );
        this.bgController.wrapItUp();
        this.xraf( this.raf );
        this.running = false;
    }

    /**
     * 
     * @description Open the admin panel.
     * @memberof admin
     * 
     */
    openAdminPanel() {
        this.element.classList.add( 'is-inactive' );
    }

    /**
     * 
     * @description Close the admin panel.
     * @memberof admin
     * 
     */
    closeAdminPanel() {
        this.element.classList.remove( 'is-inactive' );
    }

    /**
     * 
     * @description Reset the entire experience.
     * @memberof admin
     * 
     */
    restart() {
        this.xraf( this.raf );
        this.running = false;
        this.caution = false;
        this.timer = null;
        this.started = null;
        this.timer = 0;
        this.cautionTimer = 0;
        this.bgController.reset();

        this.closeAdminPanel();
        this.reset.classList.add( 'is-inactive' );
        this.bgController.timeElementSet( '' );
    }

    /**
     * 
     * @description Teardown the entire experience.
     * @memberof admin
     * 
     */
    teardown() {
        this.element = null;
        this.raf = null;
        this.xraf = null;
        this.time = null;
        this.cautionTime = null;
        this.start = null;
        this.reset = null;
        this.timer = null;
        this.cautionTimer = null;
        this.flashCaution = null;
        this.flashWrapItUp = null;
        this.running = null;
        this.started = null;
        this.caution = null;
        this.WrapItUp = null;
        this.bgController = null;
    }
}
