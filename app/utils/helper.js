import AsyncStorage from '@react-native-community/async-storage';
import to from 'await-to-js';
import find from 'lodash.find';


var self = {
    getData: function(key){
        return AsyncStorage.getItem(key)
    },
    storeData: function(key, value){
        return AsyncStorage.setItem(key, value)
    },
    getMultipleData: function(keys){
        return AsyncStorage.multiGet(keys)
    },
    handleError: function(method, error){
        console.log(`From --> ${method}`);
        console.log(error)
        global.dropDownAlertRef.alertWithType('error', 'Error', `Something went wrong. ${error}`);
    },
    genCharArray(charA, charZ) {
        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i).toUpperCase());
        }
        return a;
    },
    /**
     * safeRestore - restore data from google drive and newly added data won't be affect
     * @param {OBJECT} newdata - contains A-Z data
     */
    safeRestore(newdata){
        return new Promise(async (resolve, reject) => {
            let buttons = self.genCharArray('a', 'z');
            
            // get all values from async storage
            let [error, oldData] = await to(self.prepareForBackup());
            if(error) return reject(error);

            async function iterate(index){
                console.log(index, buttons.length)
                if(index === buttons.length) return resolve('done');
                
                let key = buttons[index];

                // newdata[key].push.apply(newdata[key], oldData[key]);

                newdata[key].forEach((item)=>{
                    let isExists = find(oldData[key], { id: item.id }) || undefined;
                    if(!isExists) oldData[key].push(item);
                })

                let [error, data] = await to(self.storeData(key, JSON.stringify(oldData[key])));
                if(error) return reject(error);
                iterate(++index);
            }

            iterate(0);
        })
    },
    /**
     * prepareForBackup - preparing data for backup
     */ 
    prepareForBackup(){
        return new Promise(async (resolve, reject)=>{
            let error, data, response, source = {};
    
            // get a-z array
            let keys = self.genCharArray('a', 'z');
    
            // get all values from async storage
            [error, data] = await to(self.getMultipleData(keys));
            if(error) return reject(error);
    
            // format data required form
            keys = keys.map(function(key, index){
                return source[key] = data[index]?(data[index][1]?JSON.parse(data[index][1]):[]):[];
            })
            resolve(source)
        })
        
    }
}


export default self;