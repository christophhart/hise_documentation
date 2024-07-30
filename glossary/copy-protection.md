---
keywords: HISE Copy Protection
summary:  Implement a server base authentification system
author: Christoph Hart
---


# HISE Copy protection

The inbuilt HISE copy protection allows a machine ID based licensing system that restricts the execution of an application / plugin to a limited amount of computers. It currently is setup to only require the authentication once (and after the activation no internet connection is required), but with the addition of an expiration date, it could be advanced to a subscription / pay to own model.

The security is halfway decent, so unless a binary is explicitely cracked by someone who knows how to reverse debug a binary, the protection prevents public sharing of a single license or other abusive license usages that can be leveraged by people whose criminal energy exceed their programming skills.

I haven't written the system from scratch, but rather build upon the one found in [JUCE](https://docs.juce.com/master/classOnlineUnlockStatus.html) and added some scripting layers around it with a few convenient methods.

## Requirements

### Plugin Side

It's important to know that all the copy protection logic is being done on the C++ level (RSA decryption, machine identification and disabling of the audio processing if the unlocking failed). Your only responsibility on the scripting level is to display the unlock state to the user and offer a way to activate the plugin if necessary.

In order to enable the copy protection, you'll have to follow these steps:

1. Add `USE_SCRIPT_COPY_PROTECTION=1` in the ExtraDefinitions fields of your project.
2. Create a RSA key pair (Tools -> Create RSA Key Pair, then choose "Save to file"). The public key will be embedded automatically into the plugin and will be used to decrypt the license key. The private key from this file needs to be stored on your server at some point and will be used to generate the key file.

The [`Unlocker` Scripting API](/scripting/scripting-api/unlocker) class is used to handle all authorization. When you create an object of this class it will try to perform a "unlock" using a preexisting key file that is stored in the app data folder. If this step fails (and `unlocker.isUnlocked()` return false), you will have to implement a logic that calls your server with the user credentials which returns a key file that needs to be stored as text file and then will be used to unlock the plugin from then on. 

### Server Side

The server will handle the key file generation for you so you need at least one API call that takes these informations as input:

- email address
- password or serial (or anything that validates the user). This step is not necessary for the actual key file generation, but if you don't do this you obviously get a freeware license key generator for every email.
- Machine ID. You have to use `FileSystem.getSystemId()`, as this uses the same algorithm to create the ID as the inbuilt key file system.
- operating system (optional)

and should perform these operations:

1. Validate the user input and the authorization of the user (query your customer database and check if the user / password / serial combination) is legit. 
2. Add the machine ID to a list of activations in your database so you can track the number of activations (or skip this step if the machine ID is already in the list which happens when you try to reactivate the same system again). This allows you to set a limit of activations you want to allow for your product.
3. If everything checks out, create the key file and return it to the user. If your server is capable of running PHP, you can use this snippet:

```
<?php
/** PHP script that creates an unlock file for the Tracktion Marketplace Status. */
/** Variables. It's up to you to pass them in there. */
$PRODUCT_ID = "YOUR PRODUCT";
$EMAIL = "YOUR EMAIL";
$USER = "YOUR NAME"; // Can be the same as the email
$DATE = date("j M Y g:i:sa");
$MACHINE = "MACHINE_ID";
$TIME = dec2hex(round(microtime(true)*1000));

$PRIVATE_KEY_PART_1 = "742ccf57e16f84bb"; // Here you need to use the private keys from the RSA.xml file
$PRIVATE_KEY_PART_2 = "ae4337057c0e3f6f"; // (you'll need to separate it at the `,` and put the two strings here)

header('Content-Description: File Transfer');
header('Content-Type: text/plain');
header('Content-Disposition: attachment; filename='.$PRODUCT_ID.'.licence');
header('Content-Transfer-Encoding: UTF-8');
header('Expires: 0');
        
/** Helper Functions */
function dec2hex($number)
{
    $hexvalues = array('0','1','2','3','4','5','6','7',
               '8','9','a','b','c','d','e','f');
    $hexval = '';
     while($number != '0')
     {
        $hexval = $hexvalues[bcmod($number,'16')].$hexval;
        $number = bcdiv($number,'16',0);
    }
    return $hexval;
}

include ('Math/BigInteger.php');  // get this from: phpseclib.sourceforge.net
function applyToValue ($message, $key_part1, $key_part2)
{
    $result = new Math_BigInteger();
    $zero  = new Math_BigInteger();
    $value = new Math_BigInteger (strrev ($message), 256);
    $part1 = new Math_BigInteger ($key_part1, 16);
    $part2 = new Math_BigInteger ($key_part2, 16);
    while (! $value->equals ($zero))
    {
        $result = $result->multiply ($part2);
        list ($value, $remainder) = $value->divide ($part2);
        $result = $result->add ($remainder->modPow ($part1, $part2));
    }
    return $result->toHex();
}

// Create the comment section
echo "Keyfile for ", $PRODUCT_ID, "\n";
echo "User: ", $USER, "\n";
echo "Email: ", $EMAIL, "\n";
echo "Machine numbers: ", "\n";
echo "Created: ", $DATE, "\n";
echo "\n";
// Create the XML 
$dom = new DOMDocument("1.0", "utf-8");
$root = $dom->createElement("key");
$dom->appendChild($root);
$root->setAttribute("user", $USER);
$root->setAttribute("email", $EMAIL);
$root->setAttribute("mach", $MACHINE);
$root->setAttribute("app", $PRODUCT_ID);
$root->setAttribute("date", $TIME);
$XML_STRING = $dom->saveXML();
$ENCRYPTED_XML = "#" . applyToValue($XML_STRING, $PRIVATE_KEY_PART_1, $PRIVATE_KEY_PART_2);
$XML_DATA = chunk_split($ENCRYPTED_XML, 70);
echo $XML_DATA;
?>
```

Ideally this should be handled as POST request using the Server API. If the server callback comes back successfully with the key file content as string, you can use `unlocker.writeKeyFile()` in order to write the content to the key file location (and unlock the plugin in the same step).

### Machine ID updates

One remark about the machine ID: It's pretty hard to come up with a machine ID that is impossible to fake but stays persistent for a computer. The logic used here is rather on the secure side, which means that the machine ID will change under certain circumstances. The most annoying one are (major) OS updates, which cause (especially Windows) systems to change their ID about every 6-8 months. This requires you to either:

1. Bump the number of activations periodically to ensure that people don't run out of activations
2. Implement some kind of "Update logic" which will be triggered when the key file exists but the license key doesn't match. Then you will need to call your server with the old and new machine ID, replace the database entry and return a key file for the new ID without increasing the number of activations.
