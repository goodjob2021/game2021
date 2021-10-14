//test
$(document).ready(function(){
    // thong tin hop dong
    // ower=0xe6a137707B3AC4ACD8f02Ec5dd2Bc7d65738471b
    
    const abi =[
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "SM_ban_data",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "Dangky",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrHocvien",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_VI",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const addressSM = "0x079B3e914ce4422AB2dF64066D7e28a7EC5683A8"; //dia chi contract
    var currentAccount="";
    var id ="";
    var resError = {code:null, msg:"first"};
	checkMM();
    
    // khai bao bien contract cho meta mask
    const web3 = new Web3(window.ethereum);
	
	window.ethereum.enable();	
    var contract_MM = new web3.eth.Contract(abi,addressSM);
    console.log(contract_MM); // de xem

    // khai bao bien contract cho infura
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/45701138633b404992975320c9933de7");
    var web3_infura = new Web3(provider);
    var contract_infura = new web3_infura.eth.Contract(abi,addressSM);
    console.log(contract_infura);

    contract_infura.events.SM_ban_data({filte:{}, fromblock:"latest"},function(error, event){
        if (error){
            console.log(error)
        }else{
            console.log(event.returnValues); // de theo doi
            $("#tbDS").append(`
                <tr class="row">
                    <td>`+event.returnValues[0]+`</td><td>`+event.returnValues[1]+`</td>
                </tr>            
            `
            );
            if ( id == event.returnValues[1] ){
                alert("Đã đăng ký thành công!\n" +
                "ID của bạn là:" + event.returnValues._id);
            }
            

        }
    });
    

    
    $("#connectMM").click(function(){
        connectMM().then((data)=>{
            currentAccount=data[0]; // lay gia tri account hien hanh cua meta dang ket noi
            console.log(currentAccount);
			ErrorMsg({code:9, msg: "Đã kết nối thành công Account " + currentAccount});
               }).catch((err)=>{
               //console.log(err);
               ErrorMsg({code:err.code, msg: err.message});
            });
        }
    )
    $("#btndangky").click(function(){
            // lam gi day
            // post len node
            if (currentAccount.length==0){
                console.log("Chay connect");           
				//resError.code=1; resError.msg="Chạy kết nối account Meta mask";
                ErrorMsg({code:1, msg:"Chạy kết nối account Meta mask"});
            }else{

                $.post("./dangky",{
                        Email: $("#txtEmail").val(),
                        Hoten: $("#txtHoten").val(),
                        SoDT: $("#txtSoDT").val()
                    },function(data){
                        //node tra ve client
                        //console.log(data)
                        if (data.ketqua == 1){
                            console.log(data.maloi._id);
                            id=data.maloi._id;
                            contract_MM.methods.Dangky(data.maloi._id).send({
                                from: currentAccount
                            }).then((data)=>{ 
                            }).catch((err)=>{
                                // bat loi khi khong thuc hien tiep tuc
                                console.log(err);
                                resError.code = err.code; resError.msg = err.message;
                                ErrorMsg(resError);
                            });                 
                        
                        }else{
                            console.log(data);
                        }
                    }
                )
            }


        }        
    )


});
async function connectMM(){
    const accounts = await ethereum.request({method:"eth_requestAccounts"});
    return accounts;
}
function checkMM(){
    if (typeof window.ethereum == "undefined" ){
        resError={code:"000", msg: "Bạn phải cài và chạy Meta mask kết nối account để sử dụng ứng dụng này!"};
		ErrorMsg(resError);
    };
}
function ErrorMsg(_resErr){
    if (_resErr.code !== null){
        alert(_resErr.msg);
        _resErr.code=null;
    }
}
