import static org.junit.Assert.*;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.junit.Test;

public class Admin {

	static ChromeDriver driver;
	static WebElement email, password, submit, adminBtn, stopBtn;
	
	@BeforeClass
	public static void beforeAll() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "/Users/rajnish/Documents/Codes/test/chromedriver100");
		driver= new ChromeDriver();
		driver.get("https://fm-cegep.vercel.app/");
		Thread.sleep(3000);
		email = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[1]/input"));
		password = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[2]/input"));
		submit = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/button"));
		email.sendKeys("testuser2@gmail.com");
		password.sendKeys("test123");
		submit.click();
		Thread.sleep(3000);   
	}
	
	@Test
	public void test1() {
		Boolean adminExist = !driver.findElements(By.xpath("//*[@id=\"__next\"]/div/div[1]/div/button[5]")).isEmpty();
		Assert.assertTrue(adminExist);
	}
	
	@Test
	public void test2() throws InterruptedException {
		adminBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div/button[5]"));
		adminBtn.click();
		Thread.sleep(3000);
		stopBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[2]/div[2]/div[2]/div[4]/button"));
		String bgColor = stopBtn.getCssValue("background-color");
		
		stopBtn.click();
		Thread.sleep(3000);
		stopBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[2]/div[2]/div[2]/div[4]/button"));
		String bgNextColor = stopBtn.getCssValue("background-color");
		Assert.assertNotEquals(bgColor, bgNextColor);
		
	}
	
	@AfterClass
	public static void close() {
		driver.quit();
	}

}
