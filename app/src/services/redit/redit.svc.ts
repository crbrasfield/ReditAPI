import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class ReditService extends BaseService {
    
    getReditList(): async.IAjaxThenable<Array<any>> {
        return this.http.json<any>({
            method: 'GET',
            url: 'https://www.reddit.com/r/lotr' + '.json'
        }).then((success) => {
            return success.response.data.children;
            
        });
        
    }

}

register.injectable('redit-svc', ReditService);
