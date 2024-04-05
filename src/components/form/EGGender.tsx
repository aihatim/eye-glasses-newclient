import EGLabel from "./EGLabel";

export default function EGGender({gender,setGender}:{gender:string,setGender:(e:string)=>void}) {
    return (
        <div className='my-2'>
          <EGLabel title='Select Gender' />
          <div className='flex gap-5'>
            <div className='flex gap-2 items-center'>
              <input
                checked={gender === 'male'}
                value={'male'}
                type='radio'
                onClick={() => setGender('male')}
              />

              <EGLabel title='Male' />
            </div>
            <div className='flex gap-2 items-center'>
              <input
                checked={gender === 'female'}
                value={'female'}
                type='radio'
                onClick={() => setGender('female')}
              />
              <EGLabel title='Female' />
            </div>
          </div>
        </div>
    );
}