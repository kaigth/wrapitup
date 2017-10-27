import query from '../util/query';
import admin from './admin/index';

/**
 * 
 * @description The base foundation application.
 * @export
 * @class application
 * 
 */
export default class application {
    constructor() {
        this.page = query( '.js-page' )[ 0 ];

        this.cover = query( '.js-cover' )[ 0 ];

        this.coverContent = query( '.js-cover-content', this.cover )[ 0 ];

        this.admin = query( '.js-admin' );

        this.loadTime = 5000;

        this.init();
    }

    /**
     * 
     * @description Initialize the experience and events.
     * @memberof application
     * 
     */
    init() {
        setTimeout( this.loadScreen.bind( this ), this.loadTime );

        this.page.style.opacity = 1;

        this.admin.map( element => new admin( element ) );
    }

    /**
     * 
     * @description Handle the loadscreen on javascript load.
     * @memberof application
     * 
     */
    loadScreen() {
        this.cover.classList.add( 'is-inactive' );
        this.coverContent.classList.add( '-shift' );
    }

    /**
     * 
     * @description Teardown the experience.
     * @memberof application
     * 
     */
    teardown() {
        this.page = null;
        this.cover = null;
        this.coverContent = null;
        this.admin = null;
    }
    
}
