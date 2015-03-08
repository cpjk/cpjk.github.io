In which I detail my adventures in running Arch Linux for the first time
========================================================================

didnt mount the ESP ->/dev/sda2 to /mnt/boot before running pacstrap -->> just needed to mount the esp and reinstall the kernel

Starting sometime in late 2013, my 2011 Macbook Pro started having kernel panics, which steadily increased in frequency until, around last October, my computer would no longer boot, regardless of any amount of cajoling.

So it was that I started looking for a new laptop. In early February I finally scraped enough money together and bought a 2015 Thinkpad X1 Carbon.

The first thing I needed to do was uninstall the bloatware piled onto the machine by Lenovo.
Second, I needed to install a real OS. I chose Arch over Ubuntu because I already used Ubuntu at work, and Arch promised more frequently updated packages and more of a challenge.

And it has been a challenge so far, but more importantly, it has been a fantastic learning experience. In this first series of blog posts I will detail my experiences setting up Arch for the first time on myThinkpad.

I am dual booting with windows in order to have access to the embedded IDE that we use at UVic EcoSAT. This didn't cause any problems on the install other than scaring me with all the
warnings on the Arch wiki accompanying a dual-boot install.

Windows wouldn't let me shrink its partition below a threshold size, so I had to use <    >. Next, I created the swap and main paritions before booting from usb to begin the install. I tried to follow the beginners guide on the Arch wiki as closely as possible during the initial install. For the most part the instructions there worked fine for me. However, one discrepancy I found with the Arch wiki was that thewiki stated that filesystems on new UEFI/GPT partitions needed to be FAT32- or VFAT-formatted, whereas I found that FAT32 and VFAT failed while ext4 worked fine for me.

The existing SYSTEM_DRV boot partition used by windows turned out to be fine for my use, so all I had to do before installing the kernel was mount the ext4-formatted main partition and the boot partition (in my case at /mnt and /mnt/boot, respectively) before installing the kernel. Once the kernel was installed (with pacstrap -i /mnt base base-devel), I followed the beginners guide to the letter for the remainder of the configuration, opting for using wifi-menu to manage wifi connection, and gummiboot for the bootloader.

xfce worked out of the box, but getting lightdm to work required installing xorg, which for some reason wasnt installed already.

The next issue I ran into was that the time was wrong. This turned out to be a dual-booting issue. I was able to fix this with timedatectl set-ntp true.

The next step was making the sound work.
speaker-test -c 2 revealed that both of the speakers were working.
aplay -l revealed that my HDMI card was being detected as the default sound device (device 0), so I needed to change the order of
the sound cards. I was able to accomplish this with
a few lines in /etc/modprobe.d/blacklist.conf (a reboot was required for the changes to take effect):
````
# PCH
options snd-hda-intel index=0 model=auto vid=8086 pid=160c
#HDMI
options snd-hda-intel index=1 model=auto vid=8086 pid=9ca0
````
made audio fn keys work with settings->keyboard->application shortcuts, setting the keys to
amixer set Master 5%+
amixer set Master 5%-
amixer set Master toggle

set brihtness: settings->keyboard->application shortcuts
xbacklight -inc 5
xbacklight -dec 5

function keys f4 and up:
echo thinkpad_acpi > /etc/modules-load.d/thinkpad_acpi.conf
echo "options thinkpad_acpi force_load=1" > /etc/modprobe.d/thinkpad_acpi.conf
this gave a nice gui bar popup showing the backlight level

trackpoint buttons!

Screen reddenining: One of my most-used programs on my macbook was flux <link>. As a replacement, I found
redshift, which I've found to be even better so far.

Keyboard backlight: The keyboard backlight was turned off by default, and at first I assumed this to be a linux issue, but I simply needed to turn it on with fn-space.


connman: I ran into an odd issue with connman, where it would reassign my hostname when I joined certain wifi networks. this was really annoying. possible solution: set AllowHostnameUpdates=true in /etc/connman/main.conf

fonts -> infinality
sudo vim /root/.gnupg/dirmngr_ldapservers.conf
https://bbs.archlinux.org/viewtopic.php?id=162098


lightdm for display manager
