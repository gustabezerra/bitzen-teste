import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Deploy} from 'cordova-plugin-ionic';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            await this.configureDeploy();
            await this.performManualUpdate();
        });
    }

    async configureDeploy() {
        const config = {
            appI: '9b7e8e78',
            channel: 'Production',
            debug: true
        };
        await Deploy.configure(config);
    }

    async performManualUpdate() {
        const update = await Deploy.checkForUpdate();
        if (update.available) {
            await Deploy.downloadUpdate((progress) => {
                console.log(progress);
            });
        }
    }
}
