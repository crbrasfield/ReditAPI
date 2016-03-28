import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import ReditRepository from '../../repositories/redit/redit.repo';
import SinglepostViewControl from '../../viewcontrols/singlepost/singlepost.vc'


export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');

    context = {
        posts: <Array<models.IPost>> []
    };

    constructor(private reditRepo: ReditRepository) {
        super();
    };

    navigatedTo(): void {
        this.reditRepo.getReditList().then((success) => {
            console.log('success');
            this.context.posts = success;
        }, (err) => {
           console.log('something went wrong!');
           console.log(err);
       });
    }
    
    getSpecificPost(id:string): void {
        this.navigator.navigate (SinglepostViewControl, {
            parameters: {
                id:id
            },
        });
    }
}

    register.viewControl('home-vc', HomeViewControl, [ReditRepository, SinglepostViewControl]);
