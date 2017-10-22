import query from '../util/query';
import admin from './admin/index';

class application {
    constructor() {
        this.page = query( '.js-page' )[0];

        this.cover = query( '.js-cover' )[0];

        this.coverContent = query( '.js-cover-content' )[0];

        this.admin = query( '.js-admin' );

        this.init();
    }

    init() {
        setTimeout( this.loadScreen.bind( this ), 5000 );

        this.page.style.opacity = 1;

        this.admin.map( element => new admin( element ) );
    }

    loadScreen() {
        this.cover.classList.add( 'is-inactive' );
        this.coverContent.classList.add( '-shift' );
    }
}

export default application;