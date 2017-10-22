import query from '../../util/query';
import bgHandler from '../bgHandler/index';

class admin {
    constructor( element ) {
        this.element = element;

        this.raf = val => window.requestAnimationFrame(val);
        
        this.xraf = val => window.cancelAnimationFrame(val);

        this.time = query( '.js-time' )[ 0 ];

        this.cautionTime = query( '.js-caution' )[ 0 ];

        this.start = query( '.js-start' )[ 0 ];

        this.reset = query( '.js-reset' )[ 0 ];

        this.timer = 0;

        this.cautionTimer = 0;

        this.flashCaution = 3;

        this.flashWrapItUp = 999;

        this.running = false;

        this.started = null;

        this.caution = false;

        this.WrapItUp = 'Wrap It Up';

        this.bgController = new bgHandler();

        this.init();
    }

    init() {
        console.warn( 'Admin initialized.' );

        this.start.addEventListener( 'click', this.go.bind( this ) );
        this.reset.addEventListener( 'click', this.restart.bind( this ) );
    }

    go( event ) {
        if ( !this.time.value || this.cautionTime.value <= 0 ) return;

        this.openAdminPanel();
        this.reset.classList.remove( 'is-inactive' );

        this.timer = this.time.value;
        this.cautionTimer = this.cautionTime.value;
        
        this.parseTime();
    }

    parseTime() {
        this.timer = parseInt( this.timer, 10 ) * 60000;
        this.cautionTimer = parseInt( this.cautionTimer, 10 ) * 60000 / 1000;

        this.initCountdown();
    }

    initCountdown() {
        this.countdown();
    }

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

    timeUpdate( remainder ) {
        this.bgController.timeElementSet(
            (remainder <= 0)
            ? this.WrapItUp
            : `${ remainder } ${ remainder <= 1 ? 'minute' : 'minutes' } remaining`
        );
    }

    cautionCountdown() {
        this.bgController.flash( this.flashCaution );
        this.bgController.caution();
        this.caution = true;
    }

    resetCountdown() {
        this.bgController.flash( this.flashWrapItUp );
        this.bgController.wrapItUp();
        this.xraf( this.raf );
        this.running = false;
    }

    openAdminPanel() {
        this.element.classList.add( 'is-inactive' );
    }

    closeAdminPanel() {
        this.element.classList.remove( 'is-inactive' );
    }

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

    teardown() {
        this.bgController = null;
    }
}

export default admin;