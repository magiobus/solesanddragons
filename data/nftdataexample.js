//this is the data sent to /api/webhooks/replicate.js

const nftdataexample = {
  id: "b34qdnwztbaljiq5t7onm55iti",
  version: "328bd9692d29d6781034e3acab8cf3fcb122161e6f5afb896a4ca9fd57090577",
  input: {
    guidance_scale: 10,
    image_dimensions: "512x512",
    negative_prompt: "female,duplicate,blackandwhite",
    num_inference_steps: 50,
    num_outputs: 1,
    prompt: "face portrait of bard male elf, dnd character illustration, 4k. ",
    scheduler: "K_EULER",
  },
  logs: "Using seed: 8735\ninput_shape: torch.Size([1, 77])\n  0%|          | 0/50 [00:00<?, ?it/s]\n  8%|▊         | 4/50 [00:00<00:01, 39.49it/s]\n 18%|█▊        | 9/50 [00:00<00:01, 40.30it/s]\n 30%|███       | 15/50 [00:00<00:00, 45.06it/s]\n 42%|████▏     | 21/50 [00:00<00:00, 47.24it/s]\n 54%|█████▍    | 27/50 [00:00<00:00, 48.29it/s]\n 64%|██████▍   | 32/50 [00:00<00:00, 48.65it/s]\n 76%|███████▌  | 38/50 [00:00<00:00, 49.28it/s]\n 88%|████████▊ | 44/50 [00:00<00:00, 49.71it/s]\n100%|██████████| 50/50 [00:01<00:00, 50.06it/s]\n100%|██████████| 50/50 [00:01<00:00, 48.16it/s]",
  output: [
    "https://replicate.delivery/pbxt/1eKHZJHXDenmlkT7aoqblre7BBk3YDPgrYR0BssYAIf0uccCB/out-0.png",
  ],
  error: null,
  status: "succeeded",
  created_at: "2023-03-13T06:21:32.636578Z",
  started_at: "2023-03-13T06:21:32.713094Z",
  completed_at: "2023-03-13T06:21:34.692511Z",
  webhook:
    "https://bb58-187-188-243-106.ngrok.io/api/webhooks/replicate?data=%7B%22stats%22%3A%7B%22name%22%3A%22magio%22%2C%22gender%22%3A%22male%22%2C%22race%22%3A%22elf%22%2C%22class%22%3A%22bard%22%2C%22level%22%3A1%2C%22abilityScores%22%3A%7B%22strength%22%3A8%2C%22dexterity%22%3A14%2C%22constitution%22%3A10%2C%22intelligence%22%3A12%2C%22wisdom%22%3A13%2C%22charisma%22%3A15%7D%2C%22skills%22%3A%7B%22acrobatics%22%3Atrue%2C%22animalHandling%22%3Afalse%2C%22arcana%22%3Afalse%2C%22athletics%22%3Afalse%2C%22deception%22%3Atrue%2C%22history%22%3Afalse%2C%22insight%22%3Afalse%2C%22intimidation%22%3Atrue%2C%22investigation%22%3Afalse%2C%22medicine%22%3Afalse%2C%22nature%22%3Afalse%2C%22perception%22%3Afalse%2C%22performance%22%3Atrue%2C%22persuasion%22%3Atrue%2C%22religion%22%3Afalse%2C%22sleightOfHand%22%3Afalse%2C%22stealth%22%3Afalse%2C%22survival%22%3Afalse%7D%2C%22equipment%22%3A%5B%22lute%22%2C%22leather+armor%22%2C%22dagger%22%2C%22backpack%22%2C%22bedroll%22%2C%2210+candles%22%2C%225+days+of+rations%22%2C%22waterskin%22%2C%2220+gold+pieces%22%5D%2C%22features%22%3A%5B%22Bardic+Inspiration%22%2C%22Spellcasting%22%5D%2C%22background%22%3A%22Entertainer%22%2C%22personalityTraits%22%3A%5B%22I+love+to+perform+for+others%2C+and+am+always+looking+for+someone+to+entertain.%22%2C%22I+get+restless+when+things+stay+the+same+for+too+long.+I+need+frequent+change+and+excitement.%22%5D%2C%22ideals%22%3A%5B%22Creativity%3A+The+world+is+in+need+of+new+ideas+and+bold+action%2C+and+I+am+the+one+to+deliver+them.+%28Chaotic%29%22%2C%22Freedom%3A+No+one+should+be+chained+to+one+place%2C+one+job%2C+or+one+lifestyle.+%28Chaotic%29%22%5D%2C%22bonds%22%3A%5B%22I+owe+everything+to+my+mentor%2C+a+famous+bard+who+taught+me+everything+I+know+about+music%2C+performance%2C+and+life.%22%2C%22I+will+do+whatever+it+takes+to+protect+my+troupe%2C+the+group+of+entertainers+who+have+become+more+of+a+family+to+me+than+my+own+kin.%22%5D%2C%22flaws%22%3A%5B%22I+am+a+bit+of+a+hedonist%2C+and+tend+to+prioritize+pleasure+and+entertainment+over+responsibility+and+duty.%22%2C%22I+have+a+hard+time+saying+no+to+drinking%2C+gambling%2C+or+flirting%2C+often+at+the+worst+possible+times.%22%5D%7D%2C%22publicKey%22%3A%22HLRnHR3KFYaESJdTh1AbETfuos4sbytAjQ2RYgRh95Hx%22%2C%22explorerLink%22%3A%22https%3A%2F%2Fexplorer.solana.com%2Ftx%2FiEWJU3HEokM6W2sCwN2UVSKHJ68ftcAKvJy9Ec7sDJXrnUMwQXGd79c77tk8XGaDLcXrREkyiFTB3VjdQx2RiL4%3Fcluster%3Ddevnet%22%7D",
  webhook_events_filter: ["completed"],
  urls: {
    cancel:
      "https://api.replicate.com/v1/predictions/b34qdnwztbaljiq5t7onm55iti/cancel",
    get: "https://api.replicate.com/v1/predictions/b34qdnwztbaljiq5t7onm55iti",
  },
  metrics: { predict_time: 1.979417 },
};

export default nftdataexample;
