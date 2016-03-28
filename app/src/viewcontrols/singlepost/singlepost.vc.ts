import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import ReditRepository from '../../repositories/redit/redit.repo';
import HomeViewControll from '../home/home.vc';

export default class SinglepostViewControl extends BaseViewControl {

    templateString: string = require('./singlepost.vc.html');
    context: any = {};
    constructor(private reditRepo: ReditRepository) {
        super();
    };

    navigatedTo(parameters: { id: string; }): void {
        let id = parameters.id;
        this.context = this.reditRepo.getSpecificPost(id)
    };
    
    goHome() {
    this.navigator.navigate(HomeViewControll)
}

}


    




    


register.viewControl('singlepost-vc', SinglepostViewControl, [ReditRepository]);
